import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseFilters, UploadedFile, BadRequestException, UploadedFiles } from '@nestjs/common';
import { FilesService } from './files.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Public()
  @Post('upload')
  @ResponseMessage("Upload Single File")
  @UseInterceptors(FileInterceptor('fileUpload'))
  @UseFilters(new HttpExceptionFilter())
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      statusCode: 201,
      message: 'Upload Single File',
      data: {
        filename: file.filename,
        path: `/images/default/${file.filename}`,   // đường dẫn để truy cập
        url: `http://localhost:8000/images/default/${file.filename}` // full URL
      }
    };
  }

  // @Public()
  // @Post('upload')
  // @ResponseMessage("Upload Multiple File")
  // @UseInterceptors(FilesInterceptor('fileUpload', 2))
  // @UseFilters(new HttpExceptionFilter())
  // uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
  //   return {
  //     statusCode: 201,
  //     message: 'Upload Single File',
  //     data: files.map(file => ({
  //       filename: file.filename,
  //       path: `/images/default/${file.filename}`,   // đường dẫn để truy cập
  //       url: `http://localhost:8000/images/default/${file.filename}` // full URL
  //     }))
  //   };
  // }

 
}
