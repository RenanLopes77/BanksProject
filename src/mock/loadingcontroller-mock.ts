import { ViewController } from 'ionic-angular';

export class LoadingMock {
    public present(): Promise<any> {
        return new Promise((resolve: Function) => {
            resolve();
        });
    }
    public dismiss(): Promise<any> {
        let view: ViewController = new ViewController();
        return view.dismiss(null);
    }
}

export class LoadingControllerMock {
    public create(): LoadingMock {
        let loading: LoadingMock = new LoadingMock;
        return loading;
    }

    public present(): Promise<any> {
        return new Promise((resolve: Function) => {
            resolve();
        });
    }

    public dismiss(): Promise<any> {
            return new Promise((resolve: Function) => {
            resolve();
        });
    }
}
