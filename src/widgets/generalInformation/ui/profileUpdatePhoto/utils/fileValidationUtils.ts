import { fileTypeFromBlob } from 'file-type'

export const validateImageFile = async (file: File) => {
  // check file type
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    return {
      isValid: false,
      errorType: 'format',
    }
  }

  // check size
  if (file.size > 10 * 1024 * 1024) {
    return {
      isValid: false,
      errorType: 'size',
    }
  }

  // Accurate form check
  try {
    const type = await fileTypeFromBlob(file)
    if (!type || !['jpg', 'png'].includes(type.ext)) {
      return {
        isValid: false,
        errorType: 'format',
        errorMessage: 'Файл поврежден или не является изображением',
      }
    }

    return { isValid: true, errorType: null }
  } catch (error) {
    console.error(error)
    return {
      isValid: false,
      errorType: 'unknown',
      errorMessage: 'Ошибка при проверке файла',
    }
  }
}

export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.readAsDataURL(file)
  })
}
