import React from "react"
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

import styles from './footer.less'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{ background: 'none' }}
      copyright={`${currentYear} lorenwe`}
      className={styles['global-footer']}
      links={[
        {
          key: 'lorenwe',
          title: 'lorenwe',
          href: 'https://blog.kaolanet.com/',
          blankTarget: true,
        }
        // {
        //   key: 'lorenwe',
        //   title: 'lorenwe',
        //   href: 'https://blog.kaolanet.com/',
        //   blankTarget: true,
        // },
        // {
        //   key: 'github',
        //   title: <GithubOutlined />,
        //   href: 'https://github.com/baiwumm/Xmw-Admin/',
        //   blankTarget: true,
        // },
        // {
        //   key: 'Vue3 Admin',
        //   title: 'Vue3 Admin',
        //   href: 'https://github.com/baiwumm/Vue3-Admin/',
        //   blankTarget: true,
        // },
        // {
        //   key: 'Vue2 Admin',
        //   title: 'Vue2 Admin',
        //   href: 'https://github.com/baiwumm/Vue2-Admin/',
        //   blankTarget: true,
        // },
      ]}
    >
    </DefaultFooter>
  )
}


export default Footer;