

import { CategoriesContext } from "../../../context/categories/CategoriesContext";
import { AdminCategoriesTable } from "../../../components/admin-categories-table/AdminCategoriesTable";
import { TitlePage } from "../../../components/Title";
import { useContext } from "react";

export function AdminCategoriesDraftPage() {
    const {adminCategories}=useContext(CategoriesContext)
    
    return (
        <>
        <TitlePage title='Categories draft' />
        <AdminCategoriesTable list={adminCategories.filter(item => item.status_name === 'draft')}/>
            </>
    )
}