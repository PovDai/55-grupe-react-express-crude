
import { TitlePage } from "../../../components/Title";
import { useContext } from "react";
import { CategoriesContext } from "../../../context/categories/CategoriesContext";
import { AdminCategoriesTable } from "../../../components/admin-categories-table/AdminCategoriesTable";


export function AdminCategoriesAllPage() {
    const {adminCategories}=useContext(CategoriesContext)
    
    return (
        <>
        <TitlePage title='All Categories' />
            <AdminCategoriesTable list={adminCategories}  />
    </>
    )
}