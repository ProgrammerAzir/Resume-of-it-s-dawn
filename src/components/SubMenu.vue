<script lang="ts">
// import { Menu } from '@/pinia/modules/userData';
import { Menu as AntMenu } from 'ant-design-vue';
import Vue, { defineComponent } from 'vue';
export interface Menu {
  id: number;
  name: string;
  icon?: string;
  sort: number;
  client_path: string;
  is_data_limit: number;
  is_menu: 0 | 1;
  is_page?: boolean;
  children: Menu[];
  permission?: Menu[];
}
// 深度搜索subMenuArr中id和item.key相等的menu
function deepSearch(subMenuArr: Menu[], key: string | number): Menu | null {
  for (let i = 0; i < subMenuArr.length; i++) {
    // console.log(subMenuArr[i].id);
    if (String(subMenuArr[i].id) == key) {
      return subMenuArr[i];
    } else if (subMenuArr[i].children.length > 0) {
      const menu = deepSearch(subMenuArr[i].children, key);
      if (menu) {
        return menu;
      }
    }
  }
  return null;
}
export default defineComponent( {
  props: {
    subMenuArr: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    selectedKeys: [] as string[],
    // selectedValue: [] as Menu[] | null,
  }),
  methods: {
    onSelectedKeysChange(item: { key: number; [key: string]: any }) {
      const { key } = item;
      (this as any).selectedKeys = [key];
      const subMenuArr = (this as any).$props.subMenuArr as Menu[];

      const menu = deepSearch(subMenuArr, key);

      (this as any).$emit('onSelect', menu);
    },
  },
  watch: {
    value: {
      handler(val) {
        (this as any).selectedKeys = val;
      },
      immediate: true,
    },
    //监听selectedKeys变化，触发change事件
    selectedKeys: {
      handler(val) {
        (this as any).$emit('change', val);
        const subMenuArr = (this as any).$props.subMenuArr as Menu[];
        const menu = deepSearch(subMenuArr, val?.[0]);
      },
      immediate: true,
    },
  },
  emits: ['onSelect', 'change'],
  render(h:any) {
    const subMenuArr = (this as any).$props.subMenuArr as Menu[];
    //根据subMenuArr生成树形菜单（深度优先搜索）
    function deepTraversal(subMenuArr: Menu[]):any {
      return subMenuArr.map(item => {
        //log(item);
        if (item.children.length > 0) {
          /**
           * <a-subMenu>
           *  <template #title>
           *    <span class="menu-text">
           *     <icon type="item?.icon"
           *       :style="{
                   fontSize: '22px',
                 }" />
           *     {{item.name}}
           *  </span>
           *  </template>
           *    {{deepTraversal(item.children)}}
           * </a-subMenu>
           */
          return h(
            AntMenu.SubMenu,
            {
              scopedSlots: {
                title: () =>
                  h(
                    'span',
                    {
                      class: 'menu-text',
                    },
                    [
                      item.name,
                    ]
                  ),
              },
              key: item.id,
            },
            deepTraversal(item.children)
          );
        } else {
          return h(
            AntMenu.Item,
            {
              key: item.id,
            },
            [
              h('span', {
                style: { display: 'block', width: '23px', height: '100%', float: 'left' },
              }),
              item.name,
            ]
            // item.name
          );
        }
      }) as any;
    }
    return h(
      AntMenu,
      {
        props: {
          mode: 'inline',
          multiple: false,
          selectedKeys: (this as any).selectedKeys,
        },
        //事件
        on: {
          select: (item: any) => (this as any).onSelectedKeysChange(item),
        },
      },
      deepTraversal(subMenuArr)
    );
  },
} )
</script>
<style lang="less">
.menu-text {
  font-size: 22px;
  margin-left: 20px;
}
.menu-icon {
  font-size: 22px;
}
</style>
