import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user";
import { UserErrors } from "../errors";
import { IUser } from "../types";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user: IUser = await UserModel.findOne({ username });

    if (user) {
      return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: "User Registered Successfully" });
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user: IUser = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, userID: user._id });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.get(
  "/available-money/:userID",
  verifyToken,
  async (req: Request, res: Response) => {
    const { userID } = req.params;
    try {
      const user = await UserModel.findById(userID);
      if (!user) {
        res.status(400).json({ type: UserErrors.NO_USER_FOUND });
      }

      res.json({ availableMoney: user.availableMoney });
    } catch (err) {
      res.status(500).json({ err });
    }
  }
);

export { router as userRouter };
