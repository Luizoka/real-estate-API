import handleError from './handleError.middleware';
import { confirmUniqueEmail } from './verifyUniqueEmail.middleware';
import { validateBody } from './validateBody.middleware';
import { verifyAdm } from './verifyAdm.middleware';
import { verifyToken } from './verifyToken.middleware';

export default { handleError, confirmUniqueEmail, validateBody, verifyAdm, verifyToken };
