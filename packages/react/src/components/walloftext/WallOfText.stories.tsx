import React from 'react';
import { storiesOf } from '@storybook/react';

import WallOfText from './WallOfText';

(WallOfText as React.FC).displayName = 'WallOfText';

storiesOf('Text', module).add('Wall of text', () => (
  <WallOfText>
    <h3>Lots of text</h3>
    <p>
      Lorem ipsum dolor sit amet, sententiae scribentur disputando eu his. Qui aliquip adversarium no, falli scriptorem
      consequuntur vis ex. Soluta assueverit duo et, iudico meliore expetenda cu eum, nec ferri graeco in. Tamquam
      consequuntur te eos.
    </p>
    <p>
      Erat labore vis at, audire splendide consetetur id eam. Eu platonem intellegam ius, graeci dissentiet disputationi
      vix ad, dicit similique ne vel. Illum insolens eos ut, graeco menandri ex duo. Cu nam dico simul qualisque, ex
      brute facete dissentiunt usu, exerci vidisse petentium ea cum.
    </p>
    <p>
      Persecuti vituperata appellantur vim id, qui porro accusam noluisse no. Legere doming ea vel, quas atqui recusabo
      ad est, sea te error quaestio. Vix at porro homero. Est sonet qualisque id, cu feugait convenire consulatu cum.
      Nam ex nisl percipitur, ea vim nemore fuisset blandit, mel feugait iudicabit pertinacia eu. Mutat atomorum
      euripidis ad pro, ad mel augue iuvaret.
    </p>
    <p>
      Ius ut viris expetendis, legere scriptorem vix no. Cum et dolor laudem labore. Mei munere efficiendi ei,
      dissentiet reprehendunt eos et. An sed dicam gloriatur, vidisse scripta atomorum te vim. Facete consetetur ne vix,
      primis fabulas sit in. Tota volumus ei eos.
    </p>
    <p>
      Cum solet pertinacia in, ut per velit errem epicurei. Sea te bonorum inermis corpora. Duo no odio partem
      complectitur, sed alia iusto at. Tota vituperatoribus sed ne, copiosae mediocritatem concludaturque sea ea. Nec no
      omnis saepe.
    </p>
    <h3>A lot more text</h3>
    <p>
      Lorem ipsum dolor sit amet, sententiae scribentur disputando eu his. Qui aliquip adversarium no, falli scriptorem
      consequuntur vis ex. Soluta assueverit duo et, iudico meliore expetenda cu eum, nec ferri graeco in. Tamquam
      consequuntur te eos.
    </p>
    <p>
      Erat labore vis at, audire splendide consetetur id eam. Eu platonem intellegam ius, graeci dissentiet disputationi
      vix ad, dicit similique ne vel. Illum insolens eos ut, graeco menandri ex duo. Cu nam dico simul qualisque, ex
      brute facete dissentiunt usu, exerci vidisse petentium ea cum.
    </p>
    <p>
      Persecuti vituperata appellantur vim id, qui porro accusam noluisse no. Legere doming ea vel, quas atqui recusabo
      ad est, sea te error quaestio. Vix at porro homero. Est sonet qualisque id, cu feugait convenire consulatu cum.
      Nam ex nisl percipitur, ea vim nemore fuisset blandit, mel feugait iudicabit pertinacia eu. Mutat atomorum
      euripidis ad pro, ad mel augue iuvaret.
    </p>
    <p>
      Ius ut viris expetendis, legere scriptorem vix no. Cum et dolor laudem labore. Mei munere efficiendi ei,
      dissentiet reprehendunt eos et. An sed dicam gloriatur, vidisse scripta atomorum te vim. Facete consetetur ne vix,
      primis fabulas sit in. Tota volumus ei eos.
    </p>
    <p>
      Cum solet pertinacia in, ut per velit errem epicurei. Sea te bonorum inermis corpora. Duo no odio partem
      complectitur, sed alia iusto at. Tota vituperatoribus sed ne, copiosae mediocritatem concludaturque sea ea. Nec no
      omnis saepe.
    </p>
  </WallOfText>
));
