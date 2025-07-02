
const avatars1 = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfL82TElwhSi4iZwTFhlwOL9D7Szmuc4rYkg&s"];
const avatars2 = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRprWha01R16u_m9rFp4Vn1Z6gyFKDLZ5rMmA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfL82TElwhSi4iZwTFhlwOL9D7Szmuc4rYkg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE_wnQGID3LJpalRdYQLoyqzgU3kq8oJWgmQRXV3vC1ghjhODs7_lSPKxTj-J4nzzHBOc&usqp=CAU",
];
const avatars3 = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRprWha01R16u_m9rFp4Vn1Z6gyFKDLZ5rMmA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfL82TElwhSi4iZwTFhlwOL9D7Szmuc4rYkg&s",
];

const CircleCard = ({
    bg,
    title,
    subtitle,
    avatars,
}: {
    bg: string;
    title: string;
    subtitle?: string;
    avatars: string[];
}) => (
    <div className={`rounded-full px-4 py-3 flex items-center gap-4 ${bg}`}>
        <div className="flex -space-x-2">
            {avatars.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-10 h-10 rounded-full  border-white"
                />
            ))}
        </div>
        <div>
            <div className="font-semibold text-white">{title}</div>
            {subtitle && <div className="text-sm text-white">{subtitle}</div>}
        </div>
    </div>
);

export default function Widget4() {
    return (
        <div className="p-4 w-full h-fit flex justify-center bg-gray-100 min-h-screen">
            <div className="flex flex-col items-start gap-4 w-full max-w-md">

                <CircleCard
                    bg="bg-cyan-400"
                    title="Chomosumke"
                    avatars={avatars1}
                />

                <CircleCard
                    bg="bg-purple-600"
                    title="Teams"
                    subtitle="Chomosumke"
                    avatars={avatars2}
                />

                <CircleCard
                    bg="bg-yellow-400"
                    title="Chomosumke"
                    avatars={avatars3}
                />

            </div>
        </div>
    );
}
