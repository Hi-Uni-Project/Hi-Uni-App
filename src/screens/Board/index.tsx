import React, { useState } from 'react';

import { Text, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BoardHeader from '@/features/board/shared/components/BoardHeader';

const BoardScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('notice');

  // 탭 콘텐츠 렌더링
  const renderContent = () => {
    switch (activeTab) {
      case 'notice':
        return (
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            consequatur aut exercitationem harum, fugit molestias commodi
            consectetur libero inventore quasi maxime, incidunt quae nam
            eligendi voluptatibus, nulla unde culpa itaque? Ut, repudiandae
            dicta quo neque nam, nihil perspiciatis suscipit modi rerum, iste
            possimus dolorem eligendi nesciunt rem mollitia ex tempore?
            Accusamus rem quas exercitationem saepe iure! Ipsum, deleniti error!
            Soluta! Sint, consequuntur ad ipsum nulla aliquid suscipit placeat
            eius est nemo? Obcaecati ab exercitationem, quod velit aspernatur
            voluptas dolores recusandae id atque saepe quos soluta excepturi
            temporibus, expedita ipsum. Similique? Ut hic sunt deserunt ab ullam
            incidunt facere alias nam blanditiis, nobis eligendi numquam
            provident animi repellendus odit eaque adipisci recusandae culpa
            voluptates pariatur quisquam nisi molestiae voluptatem dignissimos?
            Eveniet. Ab, consequuntur in. Dolor impedit beatae natus dolorem
            voluptatibus iusto voluptatum dolore ducimus accusantium possimus,
            eum unde facere ab doloremque! Praesentium tenetur molestiae saepe
            eum nam quas. Cum, aut qui? Aperiam excepturi et incidunt in hic
            soluta molestiae doloremque perferendis quam beatae iure vero nam
            cum deserunt, illo ratione culpa veritatis nisi corporis, velit
            error sint repellat sunt quibusdam! Dolorum! Laborum maiores illo
            non in, corrupti veniam voluptates corporis dignissimos quidem odio
            doloribus dolores assumenda voluptatibus numquam! Sit, dolorum. Ea
            blanditiis quo ut, consequatur accusamus placeat dolore! Veniam,
            dolor harum! Magnam, ducimus, voluptatibus sequi quo dolorem
            doloremque autem, ipsa fuga exercitationem aliquid eveniet vitae non
            impedit ratione officiis inventore tempora dignissimos asperiores
            labore incidunt excepturi ad! Iste voluptatem odit natus? Obcaecati
            ipsa pariatur reiciendis similique fugiat aut? Non officia quod
            vitae illum quos iusto, iure itaque porro nisi voluptatum fugiat ex
            maiores, odit quasi architecto ratione quo repellendus, nobis
            sapiente. Quo, corrupti vero repellat, laboriosam repellendus facere
            ipsa fuga, commodi obcaecati asperiores rem ea saepe qui vitae
            consequatur velit magni ullam soluta quod eveniet. Non molestiae
            modi minus tenetur dolor. Corrupti doloremque impedit, ab, odit
            porro omnis nesciunt autem quasi fuga ducimus earum maxime nam enim
            animi laboriosam illum nisi velit laborum. Laboriosam doloremque
            explicabo obcaecati deleniti voluptatibus. Praesentium, molestiae.
            Expedita maxime consequuntur possimus labore suscipit tenetur totam
            consectetur earum quia accusamus, quas fuga fugit ex cum laudantium
            autem, ut doloremque recusandae, deleniti eaque? Vel cum repudiandae
            maxime nemo expedita! Architecto eos ratione dolore consequuntur
            laborum ut aspernatur cum dolores accusantium. Officiis mollitia
            cupiditate provident, eaque natus consectetur molestias praesentium,
            ullam officia perspiciatis sunt deleniti incidunt, accusamus veniam
            quia quasi. Adipisci sunt ullam maiores accusamus nihil possimus
            excepturi illo distinctio, suscipit amet, obcaecati odit quibusdam
            quos quae totam accusantium rem non soluta eligendi nostrum,
            perspiciatis magni! Maiores iusto sequi facilis. Laborum, enim? Quia
            qui officia perferendis unde quasi, laborum tenetur alias accusamus
            iure nihil debitis dolor possimus repellendus laudantium illo?
            Voluptatem asperiores enim illo voluptate, consequatur deserunt
            possimus laboriosam optio! Possimus quos accusantium adipisci optio
            dignissimos, debitis provident odit assumenda nostrum totam unde
            sapiente sequi expedita sunt tempore, dolor cupiditate quaerat
            voluptatem vel atque eveniet velit similique eaque enim. Quidem?
            Dolorem, blanditiis incidunt perspiciatis repudiandae iusto,
            officiis, minima voluptatum consectetur nostrum molestias ad
            corrupti adipisci. Eius nisi amet eveniet distinctio enim?
            Voluptatem nemo ipsam quo quae sapiente veritatis sint esse. Dolore
            accusantium non inventore nulla accusamus distinctio soluta,
            laborum, optio illo corporis veritatis qui sit atque. Aut doloribus
            qui, et molestiae nulla fugit nemo enim dolorem accusamus autem
            maxime animi? Facere omnis velit, nesciunt consectetur excepturi
            nulla iure quo aliquid ex rem ut possimus nam officia natus
            molestiae, harum hic unde! Est autem iusto officiis sunt eaque
            corrupti ea tenetur! Earum commodi nisi sapiente nostrum nihil est
            nemo doloribus laboriosam dolorem, beatae suscipit excepturi fugit
            aliquid dolorum, saepe possimus, totam nobis velit maxime unde
            ratione minus blanditiis voluptatibus asperiores! Nam.
          </Text>
        );
      case 'freeboard':
        return (
          <Text>
            Norem ipsum dolor sit amet consectetur adipisicing elit. Error
            consequatur aut exercitationem harum, fugit molestias commodi
            consectetur libero inventore quasi maxime, incidunt quae nam
            eligendi voluptatibus, nulla unde culpa itaque? Ut, repudiandae
            dicta quo neque nam, nihil perspiciatis suscipit modi rerum, iste
            possimus dolorem eligendi nesciunt rem mollitia ex tempore?
            Accusamus rem quas exercitationem saepe iure! Ipsum, deleniti error!
            Soluta! Sint, consequuntur ad ipsum nulla aliquid suscipit placeat
            eius est nemo? Obcaecati ab exercitationem, quod velit aspernatur
            voluptas dolores recusandae id atque saepe quos soluta excepturi
            temporibus, expedita ipsum. Similique? Ut hic sunt deserunt ab ullam
            incidunt facere alias nam blanditiis, nobis eligendi numquam
            provident animi repellendus odit eaque adipisci recusandae culpa
            voluptates pariatur quisquam nisi molestiae voluptatem dignissimos?
            Eveniet. Ab, consequuntur in. Dolor impedit beatae natus dolorem
            voluptatibus iusto voluptatum dolore ducimus accusantium possimus,
            eum unde facere ab doloremque! Praesentium tenetur molestiae saepe
            eum nam quas. Cum, aut qui? Aperiam excepturi et incidunt in hic
            soluta molestiae doloremque perferendis quam beatae iure vero nam
            cum deserunt, illo ratione culpa veritatis nisi corporis, velit
            error sint repellat sunt quibusdam! Dolorum! Laborum maiores illo
            non in, corrupti veniam voluptates corporis dignissimos quidem odio
            doloribus dolores assumenda voluptatibus numquam! Sit, dolorum. Ea
            blanditiis quo ut, consequatur accusamus placeat dolore! Veniam,
            dolor harum! Magnam, ducimus, voluptatibus sequi quo dolorem
            doloremque autem, ipsa fuga exercitationem aliquid eveniet vitae non
            impedit ratione officiis inventore tempora dignissimos asperiores
            labore incidunt excepturi ad! Iste voluptatem odit natus? Obcaecati
            ipsa pariatur reiciendis similique fugiat aut? Non officia quod
            vitae illum quos iusto, iure itaque porro nisi voluptatum fugiat ex
            maiores, odit quasi architecto ratione quo repellendus, nobis
            sapiente. Quo, corrupti vero repellat, laboriosam repellendus facere
            ipsa fuga, commodi obcaecati asperiores rem ea saepe qui vitae
            consequatur velit magni ullam soluta quod eveniet. Non molestiae
            modi minus tenetur dolor. Corrupti doloremque impedit, ab, odit
            porro omnis nesciunt autem quasi fuga ducimus earum maxime nam enim
            animi laboriosam illum nisi velit laborum. Laboriosam doloremque
            explicabo obcaecati deleniti voluptatibus. Praesentium, molestiae.
            Expedita maxime consequuntur possimus labore suscipit tenetur totam
            consectetur earum quia accusamus, quas fuga fugit ex cum laudantium
            autem, ut doloremque recusandae, deleniti eaque? Vel cum repudiandae
            maxime nemo expedita! Architecto eos ratione dolore consequuntur
            laborum ut aspernatur cum dolores accusantium. Officiis mollitia
            cupiditate provident, eaque natus consectetur molestias praesentium,
            ullam officia perspiciatis sunt deleniti incidunt, accusamus veniam
            quia quasi. Adipisci sunt ullam maiores accusamus nihil possimus
            excepturi illo distinctio, suscipit amet, obcaecati odit quibusdam
            quos quae totam accusantium rem non soluta eligendi nostrum,
            perspiciatis magni! Maiores iusto sequi facilis. Laborum, enim? Quia
            qui officia perferendis unde quasi, laborum tenetur alias accusamus
            iure nihil debitis dolor possimus repellendus laudantium illo?
            Voluptatem asperiores enim illo voluptate, consequatur deserunt
            possimus laboriosam optio! Possimus quos accusantium adipisci optio
            dignissimos, debitis provident odit assumenda nostrum totam unde
            sapiente sequi expedita sunt tempore, dolor cupiditate quaerat
            voluptatem vel atque eveniet velit similique eaque enim. Quidem?
            Dolorem, blanditiis incidunt perspiciatis repudiandae iusto,
            officiis, minima voluptatum consectetur nostrum molestias ad
            corrupti adipisci. Eius nisi amet eveniet distinctio enim?
            Voluptatem nemo ipsam quo quae sapiente veritatis sint esse. Dolore
            accusantium non inventore nulla accusamus distinctio soluta,
            laborum, optio illo corporis veritatis qui sit atque. Aut doloribus
            qui, et molestiae nulla fugit nemo enim dolorem accusamus autem
            maxime animi? Facere omnis velit, nesciunt consectetur excepturi
            nulla iure quo aliquid ex rem ut possimus nam officia natus
            molestiae, harum hic unde! Est autem iusto officiis sunt eaque
            corrupti ea tenetur! Earum commodi nisi sapiente nostrum nihil est
            nemo doloribus laboriosam dolorem, beatae suscipit excepturi fugit
            aliquid dolorum, saepe possimus, totam nobis velit maxime unde
            ratione minus blanditiis voluptatibus asperiores! Nam.
          </Text>
        );
      default:
        return (
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            consequatur aut exercitationem harum, fugit molestias commodi
            consectetur libero inventore quasi maxime, incidunt quae nam
            eligendi voluptatibus, nulla unde culpa itaque? Ut, repudiandae
            dicta quo neque nam, nihil perspiciatis suscipit modi rerum, iste
            possimus dolorem eligendi nesciunt rem mollitia ex tempore?
            Accusamus rem quas exercitationem saepe iure! Ipsum, deleniti error!
            Soluta! Sint, consequuntur ad ipsum nulla aliquid suscipit placeat
            eius est nemo? Obcaecati ab exercitationem, quod velit aspernatur
            voluptas dolores recusandae id atque saepe quos soluta excepturi
            temporibus, expedita ipsum. Similique? Ut hic sunt deserunt ab ullam
            incidunt facere alias nam blanditiis, nobis eligendi numquam
            provident animi repellendus odit eaque adipisci recusandae culpa
            voluptates pariatur quisquam nisi molestiae voluptatem dignissimos?
            Eveniet. Ab, consequuntur in. Dolor impedit beatae natus dolorem
            voluptatibus iusto voluptatum dolore ducimus accusantium possimus,
            eum unde facere ab doloremque! Praesentium tenetur molestiae saepe
            eum nam quas. Cum, aut qui? Aperiam excepturi et incidunt in hic
            soluta molestiae doloremque perferendis quam beatae iure vero nam
            cum deserunt, illo ratione culpa veritatis nisi corporis, velit
            error sint repellat sunt quibusdam! Dolorum! Laborum maiores illo
            non in, corrupti veniam voluptates corporis dignissimos quidem odio
            doloribus dolores assumenda voluptatibus numquam! Sit, dolorum. Ea
            blanditiis quo ut, consequatur accusamus placeat dolore! Veniam,
            dolor harum! Magnam, ducimus, voluptatibus sequi quo dolorem
            doloremque autem, ipsa fuga exercitationem aliquid eveniet vitae non
            impedit ratione officiis inventore tempora dignissimos asperiores
            labore incidunt excepturi ad! Iste voluptatem odit natus? Obcaecati
            ipsa pariatur reiciendis similique fugiat aut? Non officia quod
            vitae illum quos iusto, iure itaque porro nisi voluptatum fugiat ex
            maiores, odit quasi architecto ratione quo repellendus, nobis
            sapiente. Quo, corrupti vero repellat, laboriosam repellendus facere
            ipsa fuga, commodi obcaecati asperiores rem ea saepe qui vitae
            consequatur velit magni ullam soluta quod eveniet. Non molestiae
            modi minus tenetur dolor. Corrupti doloremque impedit, ab, odit
            porro omnis nesciunt autem quasi fuga ducimus earum maxime nam enim
            animi laboriosam illum nisi velit laborum. Laboriosam doloremque
            explicabo obcaecati deleniti voluptatibus. Praesentium, molestiae.
            Expedita maxime consequuntur possimus labore suscipit tenetur totam
            consectetur earum quia accusamus, quas fuga fugit ex cum laudantium
            autem, ut doloremque recusandae, deleniti eaque? Vel cum repudiandae
            maxime nemo expedita! Architecto eos ratione dolore consequuntur
            laborum ut aspernatur cum dolores accusantium. Officiis mollitia
            cupiditate provident, eaque natus consectetur molestias praesentium,
            ullam officia perspiciatis sunt deleniti incidunt, accusamus veniam
            quia quasi. Adipisci sunt ullam maiores accusamus nihil possimus
            excepturi illo distinctio, suscipit amet, obcaecati odit quibusdam
            quos quae totam accusantium rem non soluta eligendi nostrum,
            perspiciatis magni! Maiores iusto sequi facilis. Laborum, enim? Quia
            qui officia perferendis unde quasi, laborum tenetur alias accusamus
            iure nihil debitis dolor possimus repellendus laudantium illo?
            Voluptatem asperiores enim illo voluptate, consequatur deserunt
            possimus laboriosam optio! Possimus quos accusantium adipisci optio
            dignissimos, debitis provident odit assumenda nostrum totam unde
            sapiente sequi expedita sunt tempore, dolor cupiditate quaerat
            voluptatem vel atque eveniet velit similique eaque enim. Quidem?
            Dolorem, blanditiis incidunt perspiciatis repudiandae iusto,
            officiis, minima voluptatum consectetur nostrum molestias ad
            corrupti adipisci. Eius nisi amet eveniet distinctio enim?
            Voluptatem nemo ipsam quo quae sapiente veritatis sint esse. Dolore
            accusantium non inventore nulla accusamus distinctio soluta,
            laborum, optio illo corporis veritatis qui sit atque. Aut doloribus
            qui, et molestiae nulla fugit nemo enim dolorem accusamus autem
            maxime animi? Facere omnis velit, nesciunt consectetur excepturi
            nulla iure quo aliquid ex rem ut possimus nam officia natus
            molestiae, harum hic unde! Est autem iusto officiis sunt eaque
            corrupti ea tenetur! Earum commodi nisi sapiente nostrum nihil est
            nemo doloribus laboriosam dolorem, beatae suscipit excepturi fugit
            aliquid dolorum, saepe possimus, totam nobis velit maxime unde
            ratione minus blanditiis voluptatibus asperiores! Nam.
          </Text>
        );
    }
  };

  return (
    <View className="relative">
      <BoardHeader onTabPress={setActiveTab} />
      <ScrollView style={{ marginTop: insets.top + 124 }}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

export default BoardScreen;
