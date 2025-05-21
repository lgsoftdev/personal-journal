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
      return <p style={{ marginLeft: '20px' }}>Under construction</p>;
    }
  }
};

export default Content;
