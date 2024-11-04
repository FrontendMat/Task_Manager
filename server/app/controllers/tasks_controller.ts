import { HttpContext } from '@adonisjs/core/http';
import app from '@adonisjs/core/services/app';
import { MultipartFile } from '@adonisjs/core/bodyparser';

export default class TaskController {
  public async store({ request, response }: HttpContext) {
    const taskData = request.only(['title', 'description'])

    const file = request.file('file', {
      size: '20mb',
      extnames: ['jpg', 'pdf', 'txt'],
    })

    let filePath = null;
    if (file) {
      const fileError = this.validateFile(file);
      if (fileError) return response.badRequest(fileError);

      filePath = await this.moveFile(file);
    };

    /* if a TaskModel exist: */

    // const task = await Task.create({
    //   title: taskData.title,
    //   description: taskData.description,
    //   filePath: `/uploads/${file.fileName}`,
    // })

    const task = {
      title: taskData.title,
      description: taskData.description,
      filePath: filePath,
    };

    console.log(task)

    return response.status(201).json({
      message: 'Success',
      task,
    })
  }

  private validateFile(file: MultipartFile) {
    if (!file.isValid) {
      return file.errors
    }
  };

  private async moveFile(file: MultipartFile) {
    await file.move(app.makePath('uploads'), {
      name: `${Date.now()}.${file.extname}`,
      overwrite: true,
    })
    return `/uploads/${file.fileName}`
  };
}
