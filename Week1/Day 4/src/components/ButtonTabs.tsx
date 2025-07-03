import { useState } from "react";

const tabs = [
    { id: "history", label: "HISTORY", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium..." },
    { id: "approach", label: "APPROACH", content: "Approach content here. You can customize this part easily." },
    { id: "culture", label: "CULTURE", content: "Our culture focuses on innovation, collaboration, and respect." },
    { id: "method", label: "METHOD", content: "Method content goes here. We apply best practices in every project." },
];

const ButtonTabs = () => {
    const [activeTab, setActiveTab] = useState("history");

    return (
        <div className="p-6 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-left">Button Tabs</h2>

            <div className="flex justify-center bg-gray-100 rounded overflow-hidden mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 font-semibold text-sm uppercase transition-all duration-200 ${activeTab === tab.id
                            ? "bg-green-500 text-white"
                            : "text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>


            <p className="text-gray-700 leading-relaxed max-w-xl mx-auto">
                {tabs.find((t) => t.id === activeTab)?.content}
            </p>
        </div>
    );
};

export default ButtonTabs;
