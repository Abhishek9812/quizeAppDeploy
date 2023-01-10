/**
 * @name server
 *
 * @description The entry point for the app
 */

import app from "./app";
import { secretUtil } from './utils/secretutil';
import express from 'express';
import path from "path";

app.server.use(express.static(path.join(__dirname, "./client/build")));

app.server.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
    res.sendFile(path.join(__dirname, "./admin/build/index.html"));
});

// // start listening to server on specified port
  ((port = secretUtil.PORT || 3005) => {
    app.server.listen(port, () => console.log(`> Listening on port ${port}`));
  })();
