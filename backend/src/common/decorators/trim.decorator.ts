import { Transform } from '@nestjs/class-transformer'

export const Trim = () => Transform(({ value }) => value.trim())
