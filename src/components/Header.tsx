import type { Product } from "@/lib/products";

type HeaderProps = {
    products: Product[];
    categories: Pick<
        Product,
        "category" | "categoryNameBn" | "categoryIcon"
    >[];
    todayDate: string;
};

const unitNames: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
};

export default function Header({
    products,
    categories,
    todayDate,
}: HeaderProps) {
    return (
        <header className="w-full bg-white text-black">
            <div className="mx-auto w-[92%] max-w-[1568px] sm:w-[88%] lg:w-[82%]">
                <div className="flex items-center justify-between gap-3 py-4">
                    <a href="/" className="flex items-center gap-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-xl text-black">
                            🛒
                        </span>

                        <span>
                            <span className="block font-bold">বাজার দর</span>
                            <span className="block text-xs text-black">{todayDate}</span>
                        </span>
                    </a>

                    <div className="flex items-center gap-2">
                        <a href="/signin" className="px-3 py-2 text-sm">
                            সাইন ইন
                        </a>

                        <a
                            href="/signup"
                            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white"
                        >
                            সাইন আপ
                        </a>
                    </div>
                </div>

                <div className="relative left-1/2 w-screen -translate-x-1/2 border-t border-stone-200">
                    <nav className="mx-auto flex w-[92%] max-w-[1568px] gap-5 overflow-x-auto py-3 sm:w-[88%] lg:w-[82%]">
                        {categories.map((category) => (
                            <a
                                key={category.category}
                                href={`/category/${category.category}`}
                                className="shrink-0 text-sm text-black"
                            >
                                {category.categoryIcon} {category.categoryNameBn}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="overflow-hidden border-y border-stone-200 py-3">
                <div className="ticker-track flex w-max">
                    {[...products, ...products].map((product, index) => (
                        <span
                            key={`${product.id}-${index}`}
                            className="mx-5 flex shrink-0 items-center gap-2 text-sm"
                        >
                            <span>
                                {product.image} {product.nameBn}
                            </span>

                            <span>
                                {product.today.toLocaleString("bn-BD")} টাকা/
                                {unitNames[product.unit] ?? product.unit}
                            </span>

                            <span
                                className={
                                    product.change.dir === "up"
                                        ? "text-red-600"
                                        : "text-green-700"
                                }
                            >
                                {product.change.dir === "up" ? "▲" : "▼"}{" "}
                                {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                            </span>
                        </span>
                    ))}
                </div>
            </div>
        </header>
    );
}