import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    if (status === HttpStatus.NOT_FOUND) {

      response.status(status).json({
        message: 'URL no encontrada'
      });

    } else if (status === HttpStatus.BAD_REQUEST) {

      response.status(status).json({
        message: 'Campos faltantes o inválidos',
        details: {
          message: (exceptionResponse as any).message,
          error: 'Bad Request',
          statusCode: status
        }
      });

    } else {

      response.status(status).json({
        message: (exceptionResponse as any).message || 'Error inesperado'
      });

    }
  }
}