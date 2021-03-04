import { fromString } from 'uuidv4';
import { container } from 'tsyringe';

import IHashProvider from './HasProvider/models/IHashProviders';
import BCryptHashProvider from './HasProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
