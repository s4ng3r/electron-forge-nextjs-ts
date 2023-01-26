import { ElectronApplication } from "./electron.application";

async function bootstrap() {
    const app = new ElectronApplication();

    await app.run();
}

bootstrap();