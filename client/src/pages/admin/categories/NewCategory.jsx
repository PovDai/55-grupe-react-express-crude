
import { AdminCategoryForm } from "../../../components/forms/AdminCategoryForm";
import { TitlePage } from "../../../components/Title";

export function AdminNewCategoryPage() {
    return (
        <main>
            <TitlePage title="New category" />

            <div className="container">
                <div className="row">
                    <AdminCategoryForm
                        api="http://localhost:5529/api/admin/categories"
                        method="POST" />
                </div>
            </div>
        </main>
    );
}