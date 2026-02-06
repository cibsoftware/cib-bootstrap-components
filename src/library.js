/*
 * Copyright CIB software GmbH and/or licensed to CIB software GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. CIB software licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import mitt from 'mitt'

import BAlert from './components/BAlert.vue'
import BAvatar from './components/BAvatar.vue'
import BBadge from './components/BBadge.vue'
import BButton from './components/BButton.vue'
import BButtonClose from './components/BButtonClose.vue'
import BCalendar from './components/BCalendar.vue'
import BCard from './components/BCard.vue'
import BCardBody from './components/BCardBody.vue'
import BCardText from './components/BCardText.vue'
import BCol from './components/BCol.vue'
import BCollapse from './components/BCollapse.vue'
import BDdItemBtn from './components/BDdItemBtn.vue'
import BDPopover from './components/BDPopover.vue'
import BDropdown from './components/BDropdown.vue'
import BDropdownDivider from './components/BDropdownDivider.vue'
import BDropdownForm from './components/BDropdownForm.vue'
import BDropdownGroup from './components/BDropdownGroup.vue'
import BDropdownItem from './components/BDropdownItem.vue'
import BDropdownItemButton from './components/BDropdownItemButton.vue'
import BForm from './components/BForm.vue'
import BFormCheckbox from './components/BFormCheckbox.vue'
import BFormDatepicker from './components/BFormDatepicker.vue'
import BFormFile from './components/BFormFile.vue'
import BFormGroup from './components/BFormGroup.vue'
import BFormInput from './components/BFormInput.vue'
import BFormRow from './components/BFormRow.vue'
import BFormSelect from './components/BFormSelect.vue'
import BFormSelectOption from './components/BFormSelectOption.vue'
import BFormTag from './components/BFormTag.vue'
import BFormTextarea from './components/BFormTextarea.vue'
import BFormTimepicker from './components/BFormTimepicker.vue'
import BInputGroup from './components/BInputGroup.vue'
import BInputGroupAppend from './components/BInputGroupAppend.vue'
import BInputGroupPrepend from './components/BInputGroupPrepend.vue'
import BInputGroupText from './components/BInputGroupText.vue'
import BLink from './components/BLink.vue'
import BListGroup from './components/BListGroup.vue'
import BListGroupItem from './components/BListGroupItem.vue'
import BModal from './components/BModal.vue'
import BNavItemDropdown from './components/BNavItemDropdown.vue'
import BNavbar from './components/BNavbar.vue'
import BNavbarBrand from './components/BNavbarBrand.vue'
import BNavbarNav from './components/BNavbarNav.vue'
import BNavbarToggle from './components/BNavbarToggle.vue'
import BOverlay from './components/BOverlay.vue'
import BPagination from './components/BPagination.vue'
import BPopover from './components/BPopover.vue'
import BProgress from './components/BProgress.vue'
import BProgressBar from './components/BProgressBar.vue'
import BSpinner from './components/BSpinner.vue'
import BTab from './components/BTab.vue'
import BTabs from './components/BTabs.vue'
import BToggle from './components/BToggle.vue'
import BWaitingBox from './components/BWaitingBox.vue'

export function registerComponents(app) {

  app.component('b-alert', BAlert)
  app.component('b-avatar', BAvatar)
  app.component('b-badge', BBadge)
  app.component('b-button', BButton)
  app.component('b-button-close', BButtonClose)
  app.component('b-calendar', BCalendar)
  app.component('b-card', BCard)
  app.component('b-card-body', BCardBody)
  app.component('b-card-text', BCardText)
  app.component('b-col', BCol)
  app.component('b-collapse', BCollapse)
  app.component('b-dd-item-btn', BDdItemBtn)
  app.component('b-dropdown', BDropdown)
  app.component('b-dropdown-divider', BDropdownDivider)
  app.component('b-dropdown-form', BDropdownForm)
  app.component('b-dropdown-group', BDropdownGroup)
  app.component('b-dropdown-item', BDropdownItem)
  app.component('b-dropdown-item-button', BDropdownItemButton)
  app.component('b-form', BForm)
  app.component('b-form-checkbox', BFormCheckbox)
  app.component('b-form-datepicker', BFormDatepicker)
  app.component('b-form-file', BFormFile)
  app.component('b-form-group', BFormGroup)
  app.component('b-form-input', BFormInput)
  app.component('b-form-row', BFormRow)
  app.component('b-form-select', BFormSelect)
  app.component('b-form-select-option', BFormSelectOption)
  app.component('b-form-tag', BFormTag)
  app.component('b-form-textarea', BFormTextarea)
  app.component('b-form-timepicker', BFormTimepicker)
  app.component('b-input-group', BInputGroup)
  app.component('b-input-group-append', BInputGroupAppend)
  app.component('b-input-group-prepend', BInputGroupPrepend)
  app.component('b-input-group-text', BInputGroupText)
  app.component('b-link', BLink)
  app.component('b-list-group', BListGroup)
  app.component('b-list-group-item', BListGroupItem)
  app.component('b-modal', BModal)
  app.component('b-nav-item-dropdown', BNavItemDropdown)
  app.component('b-navbar', BNavbar)
  app.component('b-navbar-brand', BNavbarBrand)
  app.component('b-navbar-nav', BNavbarNav)
  app.component('b-navbar-toggle', BNavbarToggle)
  app.component('b-overlay', BOverlay)
  app.component('b-pagination', BPagination)
  app.component('b-popover', BPopover)
  app.component('b-progress', BProgress)
  app.component('b-progress-bar', BProgressBar)
  app.component('b-spinner', BSpinner)
  app.component('b-tab', BTab)
  app.component('b-tabs', BTabs)
  app.component('b-waiting-box', BWaitingBox)
  app.directive('b-popover', BDPopover)

  const eventBus = mitt()
  app.directive('b-toggle', BToggle(eventBus))
  app.config.globalProperties.$eventBus = eventBus
}

import en from '@/assets/translations_en.json'
import de from '@/assets/translations_de.json'
import es from '@/assets/translations_es.json'
import it from '@/assets/translations_it.json'
import ru from '@/assets/translations_ru.json'
import ua from '@/assets/translations_ua.json'

export function mergeLocaleMessage(i18n, lang) {
  const translations = { en, de, es, it, ru, ua }
  const messages = translations[lang] || en
  i18n.global.mergeLocaleMessage(lang, messages)
}

export { default as BAlert } from './components/BAlert.vue'
export { default as BAvatar } from './components/BAvatar.vue'
export { default as BBadge } from './components/BBadge.vue'
export { default as BButton } from './components/BButton.vue'
export { default as BButtonClose } from './components/BButtonClose.vue'
export { default as BCalendar } from './components/BCalendar.vue'
export { default as BCard } from './components/BCard.vue'
export { default as BCardBody } from './components/BCardBody.vue'
export { default as BCardText } from './components/BCardText.vue'
export { default as BCol } from './components/BCol.vue'
export { default as BCollapse } from './components/BCollapse.vue'
export { default as BDdItemBtn } from './components/BDdItemBtn.vue'
export { default as BDPopover } from './components/BDPopover.vue'
export { default as BDropdown } from './components/BDropdown.vue'
export { default as BDropdownDivider } from './components/BDropdownDivider.vue'
export { default as BDropdownForm } from './components/BDropdownForm.vue'
export { default as BDropdownGroup } from './components/BDropdownGroup.vue'
export { default as BDropdownItem } from './components/BDropdownItem.vue'
export { default as BDropdownItemButton } from './components/BDropdownItemButton.vue'
export { default as BForm } from './components/BForm.vue'
export { default as BFormCheckbox } from './components/BFormCheckbox.vue'
export { default as BFormDatepicker } from './components/BFormDatepicker.vue'
export { default as BFormFile } from './components/BFormFile.vue'
export { default as BFormGroup } from './components/BFormGroup.vue'
export { default as BFormInput } from './components/BFormInput.vue'
export { default as BFormRow } from './components/BFormRow.vue'
export { default as BFormSelect } from './components/BFormSelect.vue'
export { default as BFormSelectOption } from './components/BFormSelectOption.vue'
export { default as BFormTag } from './components/BFormTag.vue'
export { default as BFormTextarea } from './components/BFormTextarea.vue'
export { default as BFormTimepicker } from './components/BFormTimepicker.vue'
export { default as BInputGroup } from './components/BInputGroup.vue'
export { default as BInputGroupAppend } from './components/BInputGroupAppend.vue'
export { default as BInputGroupPrepend } from './components/BInputGroupPrepend.vue'
export { default as BInputGroupText } from './components/BInputGroupText.vue'
export { default as BLink } from './components/BLink.vue'
export { default as BListGroup } from './components/BListGroup.vue'
export { default as BListGroupItem } from './components/BListGroupItem.vue'
export { default as BModal } from './components/BModal.vue'
export { default as BNavItemDropdown } from './components/BNavItemDropdown.vue'
export { default as BNavbar } from './components/BNavbar.vue'
export { default as BNavbarBrand } from './components/BNavbarBrand.vue'
export { default as BNavbarNav } from './components/BNavbarNav.vue'
export { default as BNavbarToggle } from './components/BNavbarToggle.vue'
export { default as BOverlay } from './components/BOverlay.vue'
export { default as BPagination } from './components/BPagination.vue'
export { default as BPopover } from './components/BPopover.vue'
export { default as BProgress } from './components/BProgress.vue'
export { default as BProgressBar } from './components/BProgressBar.vue'
export { default as BSpinner } from './components/BSpinner.vue'
export { default as BTab } from './components/BTab.vue'
export { default as BTabs } from './components/BTabs.vue'
export { default as BToggle } from './components/BToggle.vue'
export { default as BWaitingBox } from './components/BWaitingBox.vue'
