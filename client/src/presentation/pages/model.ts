export default abstract class Model<View> {

    protected view: View | null = null

    public setView(view: View): void {
        this.view = view
    }
}