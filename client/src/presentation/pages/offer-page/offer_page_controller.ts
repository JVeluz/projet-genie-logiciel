import OfferPageView from "./offer_page_view";
import Controller from "@presentation/controller"
import Offer from "@models/offer"
import OfferService from "@services/offer_service";


export default class OfferPageController extends Controller<OfferPageView> {

    private model: Offer[] = [];

    public onSubmit(event: Event): void {
        event.preventDefault();
        const form: HTMLFormElement = event.target as HTMLFormElement;
        const formData: FormData = new FormData(form);
        const query: string = formData.get("search-query") as string;
        const service: OfferService = new OfferService();
        this.model = service.search(query);
        this.view.updateOffers(this.model);
    }
}