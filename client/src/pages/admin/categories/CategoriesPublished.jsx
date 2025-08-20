import { useContext } from "react";
import { AdminCategoriesTable } from "../../../components/admin-categories-table/AdminCategoriesTable";
import { CategoriesContext } from "../../../context/categories/CategoriesContext";
import { TitlePage } from "../../../components/Title";

export function AdminCategoriesPublishedPage() {
    const {adminCategories}=useContext(CategoriesContext)
    
    return (
        <>
        <TitlePage title='Categories Published' />
            <AdminCategoriesTable list={adminCategories.filter(item => item.status_name === 'published')} />
            </>
    )
}