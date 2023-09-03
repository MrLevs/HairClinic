import {deleteAsync} from 'del';

import path from '../config/path.js';

const clear = () => {
    return deleteAsync(path.root)
}

export default clear;