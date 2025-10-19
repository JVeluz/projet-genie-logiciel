import Model from '../mvc/model'
import View from '../mvc/view'
import Controller from '../mvc/controller'

export default abstract class Page {

    protected model: Model<any>
    protected view: View<any>
    protected controller: Controller<any>

    public constructor(model: Model<any>, view: View<any>, controller: Controller<any>) {
        this.model = model
        this.view = view
        this.controller = controller
        this.model.setView(this.view)
        this.view.setController(this.controller)
        this.controller.setModel(this.model)
    }

    public getElement(): HTMLElement {
        return this.view.getElement()
    }
}