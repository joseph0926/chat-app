import * as z from "zod";

export const messageSchema = z.object({
  inputMessage: z.string().min(1, "입력창을 비울 수 없습니다."),
});
