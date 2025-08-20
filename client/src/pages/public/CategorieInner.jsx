
import { useContext } from 'react';
import { CategoriesContext } from '../../context/categories/CategoriesContext';
import { useParams } from 'react-router';

import { TitlePage } from '../../components/Title';

export function CategoryInnerPage() {
    const { publicCategories } = useContext(CategoriesContext);
    const { category } = useParams();

    const categoryData = publicCategories.find(c => c.url_slug === category);

    if (!categoryData) {
        return (
            <main className='min-page-height'>
                <TitlePage title="Kategorija nerasta" />

                <div className="container">
                    <div className="row">
                        <p>Norima kategorija "{category}" neegzistuoja.</p>
                    </div>
                </div>
            </main>
        );
    }
}