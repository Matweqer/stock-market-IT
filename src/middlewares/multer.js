import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { BadRequest } from 'http-errors';

const allowedImgTypes = /jpeg|jpg|png/;
const allowedCvTypes = /pdf/;

const imgFilter = (req, { originalname }, cb) => {
  const extension = path.extname(originalname).toLowerCase();
  if (allowedImgTypes.test(extension)) cb(null, true);
  else cb(new BadRequest('Not allowed file extention'));
};

const cvFilter = (req, { originalname }, cb) => {
  const extension = path.extname(originalname).toLowerCase();
  if (allowedCvTypes.test(extension)) cb(null, true);
  else cb(new BadRequest('Not allowed file extention'));
};

const imgStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, './src/static/img');
  },
  filename: ({ body: { customerId, name } }, { originalname }, cb) => {
    const extension = path.extname(originalname).toLowerCase();
    const filename = customerId + name + extension;
    const fullpath = `./src/static/img/${filename}`;
    try {
      if (fs.existsSync(fullpath)) {
        cb(new BadRequest('File already exists'));
      }
    } catch (err) {
      console.error(err);
    }
    cb(null, filename);
  },
});

const cvStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, './static/cv');
  },
  filename: ({ body: { executorId } }, { originalname }, cb) => {
    const extension = path.extname(originalname).toLowerCase();
    cb(null, executorId + extension);
  },
});

export const imgUploader = multer({ storage: imgStorage, fileFilter: imgFilter }).single('img');
export const cvUploader = multer({ storage: cvStorage, fileFilter: cvFilter }).single('cv');
