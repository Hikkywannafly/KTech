import { useState } from "react";

type TabItem = {
    id: string;
    title: string;
    content: string;
};

const tabItems: TabItem[] = [
    {
        id: "history",
        title: "HISTORY",
        content:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    },
    {
        id: "approach",
        title: "APPROACH",
        content:
            "Contenido de tabNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
    },
    {
        id: "culture",
        title: "CULTURE",
        content:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est.",
    },
    {
        id: "method",
        title: "METHOD",
        content: "This is method content. Feel free to customize it.",
    },
];

const AccordionTabs = () => {
    const [singleOpen, setSingleOpen] = useState<string | null>("history");
    const [multiOpen, setMultiOpen] = useState<string[]>(["history"]);

    const toggleSingle = (id: string) => {
        setSingleOpen((prev) => (prev === id ? null : id));
    };

    const toggleMulti = (id: string) => {
        setMultiOpen((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Button Accordions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div>
                    <h3 className="text-md font-medium mb-2">Single Accordions</h3>
                    <div className="border rounded">
                        {tabItems.map((item) => (
                            <div key={item.id} className="border-b last:border-none">
                                <button
                                    onClick={() => toggleSingle(item.id)}
                                    className={`w-full text-left px-4 py-3 font-semibold uppercase ${singleOpen === item.id
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    {item.title}
                                </button>
                                {singleOpen === item.id && (
                                    <div className="p-4 text-gray-700">{item.content}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>


                <div>
                    <h3 className="text-md font-medium mb-2">Multi Accordions</h3>
                    <div className="border rounded">
                        {tabItems.map((item) => (
                            <div key={item.id} className="border-b last:border-none">
                                <button
                                    onClick={() => toggleMulti(item.id)}
                                    className={`w-full text-left px-4 py-3 font-semibold uppercase ${multiOpen.includes(item.id)
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    {item.title}
                                </button>
                                {multiOpen.includes(item.id) && (
                                    <div className="p-4 text-gray-700">{item.content}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccordionTabs;
