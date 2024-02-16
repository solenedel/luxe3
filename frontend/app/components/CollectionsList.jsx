import { v4 as uuidv4 } from 'uuid';

function CollectionsList({ allCollections }) {
  return (
    <section className="flex gap-x-10 mt-10">
      {allCollections.map((c) => (
        <div key={uuidv4()}>
          <h4>{c.name}</h4>
        </div>
      ))}
    </section>
  );
}

export default CollectionsList;
