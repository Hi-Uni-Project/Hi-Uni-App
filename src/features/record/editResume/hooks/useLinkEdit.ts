import { useState } from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import useResumeEdit from '@/features/record/editResume/hooks/useResumeEdit';
import { Link } from '@/features/record/editResume/types/domainType';
import { RecordNavigationProps } from '@/navigation/types/navigationTypes';

type EditLinkRouteProp = RouteProp<RecordNavigationProps, 'EditLink'>;

interface LinkFormFields {
  linkName: string;
  linkUrl: string;
}

export default function useLinkEdit() {
  const navigation = useNavigation();
  const route = useRoute<EditLinkRouteProp>();
  const { resumeData, addLink, updateLink, deleteLink } = useResumeEdit();

  const { linkId, tempId } = route.params ?? {};
  const isEditMode = linkId !== undefined || tempId !== undefined;

  const editTarget: Link | undefined = isEditMode
    ? resumeData.links.find(
        l =>
          (linkId !== undefined && l.linkId === linkId) ||
          (tempId !== undefined && l.tempId === tempId),
      )
    : undefined;

  const [linkName, setLinkName] = useState(editTarget?.linkName || '');
  const [linkUrl, setLinkUrl] = useState(editTarget?.linkUrl || '');

  const fields: LinkFormFields = { linkName, linkUrl };

  const setField = <K extends keyof LinkFormFields>(
    key: K,
    value: LinkFormFields[K],
  ) => {
    if (key === 'linkName') {
      setLinkName(value as string);
    } else if (key === 'linkUrl') {
      setLinkUrl(value as string);
    }
  };

  const isFormValid = linkName.trim() !== '' && linkUrl.trim() !== '';

  const handleSubmit = () => {
    if (!isFormValid) {
      return;
    }

    if (isEditMode && editTarget) {
      updateLink({
        linkId: editTarget.linkId,
        tempId: editTarget.tempId,
        linkName,
        linkUrl,
      });
    } else {
      addLink({ linkName, linkUrl });
    }

    navigation.goBack();
  };

  const handleDelete = () => {
    if (isEditMode && editTarget) {
      deleteLink(editTarget.linkId ?? editTarget.tempId);
      navigation.goBack();
    }
  };

  return {
    fields,
    setField,
    isEditMode,
    isFormValid,
    handleSubmit,
    handleDelete,
  };
}
