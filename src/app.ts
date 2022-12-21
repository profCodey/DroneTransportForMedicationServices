
import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import db from "./config/database.config";
import cors from "cors";
import droneRouter from "./routes/drone";
import medicationRouter from "./routes/medication";

