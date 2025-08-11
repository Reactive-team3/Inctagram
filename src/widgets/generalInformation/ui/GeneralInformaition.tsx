import React, { useState } from 'react'
import style from './GeneralInformaition.module.scss'
import { Button } from '@/shared/ui/button/Button'
import Image from 'next/image'
import { Modal } from '@/shared/ui/modal/Modal'
import styles from '@/app/(private)/create/ui/createPostModalPage.module.scss'
import Icon from '@/shared/ui/icon/Icon'
import { ProfileUpdatePhoto } from '@/widgets/generalInformation/ui/profileUpdatePhoto/ProfileUpdatePhoto'
import { useGetProfileQuery } from '@/features/profile/model/profileApi'

export const GeneralInformaition = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { data } = useGetProfileQuery()
  const url = data?.avatar?.url
  return (
    <>
      <div className={style.container}>
        <div className={style.main}>
          <div className={style.photo}>
            <div>
              {url ? (
                <Image
                  src={url}
                  alt="photo"
                  className={style.profilePhoto}
                  width={192}
                  height={192}
                />
              ) : (
                <Image
                  src="/user-images/image.png"
                  alt="photo"
                  className={style.profilePhoto}
                  width={192}
                  height={192}
                />
              )}
            </div>
            <Button onClick={handleOpen} variant={'outline'}>
              Select Profile Photo
            </Button>
          </div>
          <div className={style.info}></div>
        </div>
        <hr className={style.divider} />
        <div className={style.saveBtn}>
          <Button>Save Changes</Button>
        </div>
      </div>
      <Modal open={open} onClose={handleClose} modalTitle={'Add a Profile Photo'}>
        {
          <div className={styles.placeholder}>
            <div className={styles.imageFrame}>
              <Icon name="image-outline" width={48} height={48} />
            </div>
            <ProfileUpdatePhoto onClose={handleClose}>
              <Button>Select from computer</Button>
            </ProfileUpdatePhoto>
          </div>
        }
      </Modal>
    </>
  )
}
