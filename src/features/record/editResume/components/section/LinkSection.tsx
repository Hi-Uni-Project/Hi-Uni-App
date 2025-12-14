import React, { useState } from 'react';

import Clipboard from '@react-native-clipboard/clipboard';
import { Text, View } from 'react-native';

import AddButton from '@/features/record/editResume/components/AddButton';
import LinkCard from '@/features/record/editResume/components/card/LinkCard';
import { Link } from '@/features/record/editResume/types/domainType';

interface LinkSectionProps {
  links: Link[];
  onAddPress: () => void;
  onEditPress: (id: number | string | undefined) => void;
}

const LinkSection = ({ links, onAddPress, onEditPress }: LinkSectionProps) => {
  const [copiedLinks, setCopiedLinks] = useState<Record<string, boolean>>({});

  const handleCopy = async (link: Link) => {
    const key = link.linkId ?? link.tempId ?? link.linkUrl;

    try {
      Clipboard.setString(link.linkUrl);
    } catch (e) {
      console.log('copy fallback:', link.linkUrl);
    }

    setCopiedLinks(prev => ({
      ...prev,
      [key]: true,
    }));
    setTimeout(() => {
      setCopiedLinks(prev => ({
        ...prev,
        [key]: false,
      }));
    }, 2000);
  };

  return (
    <>
      <View className="mt-[41px] px-5">
        <View className="flex-row items-center justify-between">
          <Text className="typo-body-17-semibold">링크</Text>
          <View className="flex-row items-center">
            <AddButton onPress={onAddPress} />
          </View>
        </View>

        <Text className="mt-[13px] text-surface-400 typo-body-15-regular">
          포트폴리오 혹은 참고할만한 링크를 넣어주세요.
        </Text>
      </View>

      {links.length > 0 && (
        <View className="mt-3 px-5">
          {links.map(link => {
            const key = link.linkId ?? link.tempId ?? link.linkUrl;

            return (
              <LinkCard
                key={key}
                link={link}
                onPress={() => onEditPress(link.linkId ?? link.tempId)}
                isCopied={copiedLinks[key]}
                onCopyPress={() => handleCopy(link)}
              />
            );
          })}
        </View>
      )}
    </>
  );
};

export default LinkSection;
