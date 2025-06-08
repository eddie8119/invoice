import { buttonStyles } from './buttons';
import { containerStyles } from './containers';
import { formStyles } from './forms';
import { headerStyles } from './header';
import { linkStyles } from './link';
import { pannelStyles } from './pannel';
import { typographyStyles } from './typography';

export const CommonStyles = {
  ...containerStyles,
  ...pannelStyles,
  ...typographyStyles,
  ...buttonStyles,
  ...formStyles,
  ...headerStyles,
  ...linkStyles,
};
