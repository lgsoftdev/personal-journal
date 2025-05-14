import { MenuOptions } from '../../types';
import TelAdds from '../tel-adds';

interface ContentProps {
  selectedMenuOption?: MenuOptions;
}

const Content = ({ selectedMenuOption }: ContentProps) => {
  switch (selectedMenuOption) {
    case MenuOptions.TelAdds:
      return <TelAdds />;
    default: {
      return <p>Under construction</p>;
    }
  }
};

export default Content;
