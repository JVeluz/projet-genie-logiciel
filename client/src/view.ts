export default class View {

    private static instance: View

    private main: HTMLElement = document.getElementById("main") as HTMLElement

    private constructor() { }

    public static getInstance(): View {
        if (!View.instance) {
            View.instance = new View()
        }
        return View.instance
    }

    public async render(filePath: string): Promise<void> {
        this.main.innerHTML = await this.fetchHTML(filePath)
    }

    private async fetchHTML(filePath: string, deep: number = 0): Promise<string> {
        if (deep > 10) throw new Error("Too many nested includes")

        const tmp = document.createElement("tmp")
        tmp.innerHTML = await fetch(filePath).then(res => res.text())

        const includes = tmp.getElementsByTagName("include")
        for (const include of includes) {
            const src: string | null = include.getAttribute("src")
            if (src) {
                include.innerHTML = await this.fetchHTML(src, deep + 1)
            }
        }
        return tmp.innerHTML
    }
}