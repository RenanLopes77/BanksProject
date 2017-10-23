export class ToastControllerMock {
    public create(): ToastMock {
        let alert: ToastMock = new ToastMock;
        return alert;
    }
}

export class ToastMock {
    public present(): Promise<any> {
        return new Promise((resolve: Function) => {
            resolve();
        });
    }
}
