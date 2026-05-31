import express, { Request, Response } from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import { createProxyMiddleware } from "http-proxy-middleware";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getNetworkAddress(): string | null {
  try {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      const netInterface = interfaces[name];
      if (netInterface) {
        for (const net of netInterface) {
          // Check for IPv4 and non-internal loopback addresses
          if (net.family === "IPv4" && !net.internal) {
            return net.address;
          }
        }
      }
    }
  } catch (error) {
    // Graceful fallback if interfaces cannot be retrieved
  }
  return null;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  console.log("🚀 Starting Python backend...");
  
  const commandsToTry = ["python3", "python"];
  let currentCommandIndex = 0;

  const startPython = () => {
    if (currentCommandIndex >= commandsToTry.length) {
      console.error("❌ Crucial: All Python attempts to start the backend failed.");
      return;
    }

    const command = commandsToTry[currentCommandIndex];
    console.log(`🔍 Attempting to run Python backend with: ${command}`);

    const pyProcess = spawn(command, ["backend/server.py"], {
      stdio: "inherit",
    });

    let hasSpawnError = false;
    const startTime = Date.now();

    pyProcess.on("error", (err: any) => {
      hasSpawnError = true;
      console.warn(`⚠️ Command '${command}' failed to spawn:`, err.message);
      currentCommandIndex++;
      startPython();
    });

    pyProcess.on("close", (code) => {
      if (hasSpawnError) return;

      const duration = Date.now() - startTime;
      console.log(`ℹ️ Python (${command}) process closed with code ${code} after ${duration}ms`);

      // 9009 is Windows 'command not found' exit helper.
      // 127 is Unix 'command not found'.
      // If it exited extremely fast (under 1.5 seconds) with 9009 or 127, try the next command.
      if ((code === 9009 || code === 127) && duration < 1500) {
        console.warn(`⚠️ Executable '${command}' is likely not valid or missing (code ${code}). Trying next...`);
        currentCommandIndex++;
        startPython();
      } else if (code !== null && code !== 0) {
        // It was a valid executable but crashed/exited with some other error, probably missing dependencies!
        console.warn(`⚠️ Python server '${command}' exited with code ${code}. Attempting pip installation backup...`);
        runPipFallback(command);
      }
    });
  };

  const runPipFallback = (command: string) => {
    console.log(`📦 Installing Python dependencies using ${command} pip...`);
    const attempts = [
      { upgrade: false, useUser: false },
      { upgrade: false, useUser: true },
    ];
    
    let currentAttempt = 0;
    
    const runPip = () => {
      const { upgrade, useUser } = attempts[currentAttempt];
      const args = ["-m", "pip", "install"];
      if (useUser) args.push("--user");
      if (upgrade) args.push("--upgrade");
      args.push("-r", "backend/requirements.txt");
      
      console.log(`Executing pip backup: ${command} ${args.join(" ")}`);
      const pip = spawn(command, args, { stdio: "inherit" });

      pip.on("close", (code) => {
        if (code === 0) {
          console.log("✅ Dependencies installed successfully. Launching server...");
          spawn(command, ["backend/server.py"], { stdio: "inherit" });
        } else {
          currentAttempt++;
          if (currentAttempt < attempts.length) {
            runPip();
          } else {
            console.error("❌ All pip fallbacks executed. Spawning server anyway.");
            spawn(command, ["backend/server.py"], { stdio: "inherit" });
          }
        }
      });
    };
    runPip();
  };

  startPython();

  // API Proxy - must be BEFORE Vite middleware or static files
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://127.0.0.1:8000",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production setup
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    const networkIP = getNetworkAddress();
    console.log(`\n  ⚡ eAzy Downloader is ready!`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    if (networkIP) {
      console.log(`  ➜  Network: http://${networkIP}:${PORT}/`);
    }
    console.log("");
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
