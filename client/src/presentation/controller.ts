export default abstract class Controller<View extends HTMLElement> {
    protected view: View;

    public constructor(view: View) {
        this.view = view;
    }
}