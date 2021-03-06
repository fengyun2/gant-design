import React, { Component } from 'react';
import { Input, Select } from 'antd';
import { compose, toClass, withProps, defaultProps, mapProps, withPropsOnChange } from 'recompose'
import { withEdit } from '../compose';
import { WidthBasicProps } from '../compose/widthbasic';
import codesList from './codes.json';
export interface GantTelePhoneProps extends WidthBasicProps {
  value?: value,
  onChange?: (val: value) => void,
  placeholder?: string,
  allowClear?: boolean
}
interface value {
  key: string,
  value: string,
}
const isPhone = /^\d{7,8}$/
const reg = /^\d{0,8}$/
const withCode = compose(
  toClass,
  withProps(({ value = {} as any }) => {
    const { key: code = "010", value: phone } = value
    return {
      code,
      phone
    }
  }),
  defaultProps({
    placeholder: '请输入电话号码',
    allowClear: true,
  }),
  withProps(({ onChange, code: oCode, phone: oPhone }) => {
    return {
      filterOption(text, option) {
        const { key, props: { label } } = option
        return key.includes(text) || label.includes(text)
      },
      onCodeChange(code) {
        onChange({
          key: code, value: oPhone
        })
      },
      onPhoneChange(phone) {
        onChange({
          key: oCode, value: phone
        })
      }
    }
  })
)


const getValue = ({ code, phone }) => phone ? `${code} - ${phone}` : ''
@compose(
  withCode,
  withPropsOnChange(['phone'], ({ phone }) => ({
    confirmable: !phone || isPhone.test(String(phone))
  })),
  withEdit(getValue, "gantd-input-telphone-addonBefore"),
  withProps(({ code, onCodeChange, filterOption }) => ({
    addonBefore: (
      <Select dropdownClassName="gantd-input-telphone-addonBefore" style={{ width: 130 }} value={code} onChange={onCodeChange} showSearch filterOption={filterOption}>
        {
          codesList.map((citys, index) => {
            let renderCitys = citys
            const [[province, pCode], ...oCitys] = citys
            if (!pCode) renderCitys = oCitys
            return (
              <Select.OptGroup label={province} key={province}>
                {
                  renderCitys.map(city => city.length > 1 ? (
                    <Select.Option key={city[1]} value={city[1]} label={city[0]}>
                      <span>{city[1]}</span><span style={{ display: "inline-block", marginLeft: 6 }}>{city[0]}</span>
                    </Select.Option>
                  ) : undefined)
                }
              </Select.OptGroup>
            )
          })
        }
      </Select>
    )
  })),
  mapProps(({ filterOption, ...props }) => props),

)
class TelePhone extends Component<any> {

  onChange = (e) => {
    const { onPhoneChange } = this.props
    const { value } = e.target
    if (!value || reg.test(value)) {
      onPhoneChange(value)
    }
  }

  onKeyDown = (e) => {
    const { value, code, phone, onEnter } = this.props
    if (!code || isPhone.test(phone)) {
      onEnter(e)
    }
  }

  render() {
    const { onEnter, onPhoneChange, onCodeChange, phone, ...props } = this.props

    return (
      <Input {...props} value={phone} onKeyDown={this.onKeyDown} onChange={this.onChange} />
    );
  }
}

export default class TelePhoneWrapper extends Component<GantTelePhoneProps> {
  render() {
    return <TelePhone {...this.props} />
  }
}