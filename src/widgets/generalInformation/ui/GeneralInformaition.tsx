import React, { useState } from 'react'
import style from './generalInformaition.module.scss'
import { Button } from '@/shared/ui/button/Button'

import { Modal } from '@/shared/ui/modal/Modal'
import styles from '@/app/(private)/create/ui/createPostModalPage.module.scss'
import Icon from '@/shared/ui/icon/Icon'
import { ProfileUpdatePhoto } from '@/widgets/generalInformation/ui/profileUpdatePhoto/ProfileUpdatePhoto'
import { useGetProfileQuery } from '@/features/profile/model/profileApi'
import { DeleteAvatarModal } from '@/widgets/modals/deleteAvatarModal/DeleteAvatarModal'
import { ExtendedPicture } from '@/shared/ui/extendedPicture/ExtendedPicture'
import { ErrorBlock, Format } from '@/widgets/generalInformation/ui/errorBlock/ErrorBlock'
import { Input } from '@/shared/ui/Input/Input'
import { SelectComponent } from '@/shared/ui/select/SelectComponent'
import { TextArea } from '@/shared/ui/textArea/TextArea'
import CustomDatePicker from '@/shared/ui/datePicker/DatePicker'

export const GeneralInformaition = () => {
  const countryOptions = [
    { value: '1', label: 'Belarus' },
    { value: '2', label: 'Russia' },
    { value: '3', label: 'Poland' },
    { value: '4', label: 'USA' },
  ]
  const cityOptions = [
    { value: '1', label: 'Minsk' },
    { value: '2', label: 'Moscow' },
    { value: '3', label: 'Warsaw' },
    { value: '4', label: 'Washington' },
  ]
  const [open, setOpen] = useState(false)
  const [isError, setIsError] = useState(false)
  const [deleteAvatarOpenModal, setDeleteAvatarOpenModal] = useState(false)
  const [errorFormat, setErrorFormat] = useState<Format>('size')
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setIsError(false)
  }
  const { data, isLoading } = useGetProfileQuery()
  const url = data?.avatar?.url
  const handleDeleteOpenModal = () => setDeleteAvatarOpenModal(true)
  const handleDeleteCloseModal = () => setDeleteAvatarOpenModal(false)
  const [selectedCountry, setSelectedCountry] = useState('1')
  const [selectedCity, setSelectedCity] = useState('1')
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value)
  }
  const handleCityChange = (value: string) => {
    setSelectedCity(value)
  }
  return (
    <>
      <div className={style.container}>
        <div className={style.main}>
          <div className={style.photo}>
            <div>
              {url && !isLoading && (
                <>
                  <div className={style.profileImage}>
                    <button className={style.deleteBtn} onClick={handleDeleteOpenModal}>
                      <Icon name={'close'} className={style.deleteIcon} width={16} height={16} />
                    </button>
                  </div>
                </>
              )}
              <ExtendedPicture
                src={url}
                alt="photo"
                className={style.profilePhoto}
                width={192}
                height={192}
              />
            </div>
            <Button onClick={handleOpen} variant={'outline'}>
              Select Profile Photo
            </Button>
          </div>
          <div className={style.info}>
            <Input name={'UserName'} label={'Username'} />
            <Input name={'FirstName'} label={'First Name'} />
            <Input name={'LastName'} label={'Last Name'} />
            <CustomDatePicker label={'Date of birth'} />
            <div className={style.selectedGroup}>
              <SelectComponent
                defaultValue={selectedCountry}
                onChangeAction={handleCountryChange}
                options={countryOptions}
                className={style.select}
              />
              <SelectComponent
                defaultValue={selectedCity}
                onChangeAction={handleCityChange}
                options={cityOptions}
                className={style.select}
              />
            </div>
            <TextArea label={'About Me'} name={'AboutMe'} />
          </div>
        </div>
        <hr className={style.divider} />
        <div className={style.saveBtn}>
          <Button>Save Changes</Button>
        </div>
      </div>
      <Modal open={open} onClose={handleClose} modalTitle={'Add a Profile Photo'}>
        {
          <div className={styles.placeholder}>
            {isError && <ErrorBlock name={errorFormat} />}
            <div className={styles.imageFrame}>
              <Icon name="image-outline" width={48} height={48} />
            </div>
            <ProfileUpdatePhoto
              setError={setIsError}
              setErrorFormat={setErrorFormat}
              onClose={handleClose}
            >
              <Button>Select from computer</Button>
            </ProfileUpdatePhoto>
          </div>
        }
      </Modal>
      <DeleteAvatarModal open={deleteAvatarOpenModal} onClose={handleDeleteCloseModal} />
    </>
  )
}
