import ToolBar from "../ToolBar/ToolBar.tsx";
import React from "react";



const Layout: React.FC<React.PropsWithChildren> = ({children}) => {

    return (
        <>
            <header className="mb-4">
                <ToolBar/>
            </header>
            <main className="container">
                {children}
            </main>
        </>
    );
};

export default Layout;