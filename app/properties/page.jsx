import Link from 'next/link'
import properties from '@/properties.json';
import PropertyCard from '@/components/PropertyCard';

const PropertiesPage = () => {
  return (
    <section class="px-4 py-6">
      <div class="container-xl lg:container m-auto px-4 py-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map(property=>(
            <PropertyCard />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PropertiesPage
