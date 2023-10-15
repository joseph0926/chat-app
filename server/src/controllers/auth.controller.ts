import { db } from '@/lib/db';
import { CatchAsyncError } from '@/middlewares/catchAsyncErrors';
import { Request, Response } from 'express';

type CreateUserProps = {
  clerkId: string;
  email: string;
};

export const createProfile = CatchAsyncError(async (req: Request, res: Response) => {
  try {
    const { clerkId, email }: CreateUserProps = req.body;

    const existingProfile = await db.profile.findUnique({
      where: {
        clerkId
      }
    });
    if (existingProfile) {
      return res.status(401).json({ message: '이미 가입된 유저입니다.', profile: null });
    }

    const profile = await db.profile.create({
      data: {
        clerkId,
        email,
        name: email.substring(0, email.indexOf('@'))
      }
    });

    return res.status(201).json({ message: '유저가 생성되었습니다.', profile });
  } catch (error) {
    console.log('[CREATE_USER_ERROR]: ', error);
    return res.status(500).json({ message: `유저 생성에 실패하였습니다: ${error}`, profile: null });
  }
});
