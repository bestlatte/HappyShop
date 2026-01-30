import RootLayout from "../layouts/RootLayout";

export default function App() {
    return (
        <RootLayout children="你好">
            <h1 className="text-2xl font-bold">首頁</h1>
            <p className="mt-2 text-gray-600">
                放商品列表
            </p>
        </RootLayout>
    );
}
