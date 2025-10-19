export default abstract class Controller<Model> {

    protected model: Model | null = null

    public setModel(model: Model): void {
        this.model = model
    }
}
