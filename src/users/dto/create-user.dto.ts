import { IsEmail, IsNotEmpty, IsOptional, IsUUID, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Full Name is required' })
  fullName: string;

  @IsNotEmpty({ message: 'Age is required' })
  @IsNumber({}, { message: 'Age must be a number' })
  age: number;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;

  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  // Với TypeORM, role.id là uuid nên ta dùng IsUUID
  @IsNotEmpty({ message: 'Role is required' })
  @IsUUID('4', { message: 'Role must be a valid UUID' })
  roleId: string;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  targetScore?: number;
}

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Full Name is required' })
  fullName: string;

  @IsNotEmpty({ message: 'Age is required' })
  @IsNumber({}, { message: 'Age must be a number' })
  age: number;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;

  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  targetScore?: number;
}
