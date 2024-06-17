import express, { Application } from "express";
import cors from "cors";
import router from "./app/routes";
const app: Application = express();

app.use(express.json());

app.use(cors());

//Routes

app.use("/api/v1/", router);

// app.get("/", (req: Request, res: Response) => {
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Student is created succesfully",
//     data: result,
//   });
// });

export default app;
