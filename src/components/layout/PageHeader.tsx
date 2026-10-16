type Props = {
  title: string;
  intro?: string;
};

/** Navy title band shown at the top of every inner page. */
export function PageHeader({ title, intro }: Props) {
  return (
    <div className="page-header">
      <div className="container-page">
        <h1 className="heading-xl">{title}</h1>
        {intro && <p className="page-header__intro">{intro}</p>}
      </div>
    </div>
  );
}